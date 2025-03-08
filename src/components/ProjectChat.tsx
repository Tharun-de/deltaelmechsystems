import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Send, Paperclip, Smile, Trash2, Edit2, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  timestamp: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  is_edited?: boolean;
}

interface ProjectChatProps {
  projectId: string;
}

const ProjectChat: React.FC<ProjectChatProps> = ({ projectId }) => {
  const { user } = useAuth0();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    // Set up WebSocket connection for real-time updates
    const ws = new WebSocket(`ws://your-websocket-server/projects/${projectId}/chat`);
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    return () => {
      ws.close();
    };
  }, [projectId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/messages`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError('Failed to load messages');
      console.error('Error fetching messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`/api/projects/${projectId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          content: newMessage,
          sender_id: user?.sub,
          sender_name: user?.name,
          sender_avatar: user?.picture,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      const message = await response.json();
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    }
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/messages/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ content: newContent }),
      });

      if (!response.ok) throw new Error('Failed to edit message');
      
      const updatedMessage = await response.json();
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? updatedMessage : msg
      ));
      setEditingMessage(null);
    } catch (err) {
      setError('Failed to edit message');
      console.error('Error editing message:', err);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/projects/${projectId}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete message');
      
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } catch (err) {
      setError('Failed to delete message');
      console.error('Error deleting message:', err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/projects/${projectId}/messages/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload file');
      
      const attachment = await response.json();
      setNewMessage(prev => prev + `\n[${file.name}](${attachment.url})`);
    } catch (err) {
      setError('Failed to upload file');
      console.error('Error uploading file:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === user?.sub ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender_id === user?.sub
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender_avatar && (
                  <img
                    src={message.sender_avatar}
                    alt={message.sender_name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {message.sender_name}
                    </span>
                    <span className="text-xs opacity-75">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  {editingMessage?.id === message.id ? (
                    <div className="mt-2">
                      <textarea
                        value={editingMessage.content}
                        onChange={(e) =>
                          setEditingMessage({
                            ...editingMessage,
                            content: e.target.value,
                          })
                        }
                        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => setEditingMessage(null)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEditMessage(message.id, editingMessage.content)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.attachments?.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-2 text-sm text-blue-500 hover:text-blue-600"
                        >
                          📎 {attachment.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {message.sender_id === user?.sub && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setEditingMessage(message)}
                      className="p-1 hover:bg-gray-700 rounded-full"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="p-1 hover:bg-gray-700 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Smile className="h-5 w-5" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>

        {/* Attachment Menu */}
        {showAttachmentMenu && (
          <div className="mt-2 p-2 bg-gray-50 rounded-lg">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="block text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Upload File
            </label>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mx-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectChat; 