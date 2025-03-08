import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { useToast } from '../../components/ui/use-toast';

interface SystemSettings {
  companyName: string;
  companyAddress: string;
  contactEmail: string;
  contactPhone: string;
  taxRate: number;
  paymentGateway: {
    stripe: {
      enabled: boolean;
      publicKey: string;
      secretKey: string;
    };
    razorpay: {
      enabled: boolean;
      keyId: string;
      keySecret: string;
    };
  };
  emailSettings: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string;
    fromEmail: string;
    fromName: string;
  };
  notificationSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    applicationUpdates: boolean;
    paymentUpdates: boolean;
    projectUpdates: boolean;
  };
}

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SystemSettings>({
    companyName: 'Delta Elmech Systems',
    companyAddress: '',
    contactEmail: '',
    contactPhone: '',
    taxRate: 18,
    paymentGateway: {
      stripe: {
        enabled: true,
        publicKey: '',
        secretKey: ''
      },
      razorpay: {
        enabled: true,
        keyId: '',
        keySecret: ''
      }
    },
    emailSettings: {
      smtpHost: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPass: '',
      fromEmail: '',
      fromName: ''
    },
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: false,
      applicationUpdates: true,
      paymentUpdates: true,
      projectUpdates: true
    }
  });

  const handleSaveSettings = async () => {
    try {
      // In a real app, you would call an API to save the settings
      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save settings",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">System Settings</h2>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>

      <div className="grid gap-6">
        {/* Company Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Company Information</h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-address">Company Address</Label>
              <Textarea
                id="company-address"
                value={settings.companyAddress}
                onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input
                  id="contact-phone"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Gateway Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Gateway Settings</h3>
          <div className="grid gap-6">
            {/* Stripe Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="stripe-enabled">Enable Stripe</Label>
                <Switch
                  id="stripe-enabled"
                  checked={settings.paymentGateway.stripe.enabled}
                  onCheckedChange={(checked: boolean) => setSettings({
                    ...settings,
                    paymentGateway: {
                      ...settings.paymentGateway,
                      stripe: {
                        ...settings.paymentGateway.stripe,
                        enabled: checked
                      }
                    }
                  })}
                />
              </div>
              {settings.paymentGateway.stripe.enabled && (
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stripe-public-key">Stripe Public Key</Label>
                    <Input
                      id="stripe-public-key"
                      type="password"
                      value={settings.paymentGateway.stripe.publicKey}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentGateway: {
                          ...settings.paymentGateway,
                          stripe: {
                            ...settings.paymentGateway.stripe,
                            publicKey: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-secret-key">Stripe Secret Key</Label>
                    <Input
                      id="stripe-secret-key"
                      type="password"
                      value={settings.paymentGateway.stripe.secretKey}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentGateway: {
                          ...settings.paymentGateway,
                          stripe: {
                            ...settings.paymentGateway.stripe,
                            secretKey: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Razorpay Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="razorpay-enabled">Enable Razorpay</Label>
                <Switch
                  id="razorpay-enabled"
                  checked={settings.paymentGateway.razorpay.enabled}
                  onCheckedChange={(checked: boolean) => setSettings({
                    ...settings,
                    paymentGateway: {
                      ...settings.paymentGateway,
                      razorpay: {
                        ...settings.paymentGateway.razorpay,
                        enabled: checked
                      }
                    }
                  })}
                />
              </div>
              {settings.paymentGateway.razorpay.enabled && (
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="razorpay-key-id">Razorpay Key ID</Label>
                    <Input
                      id="razorpay-key-id"
                      type="password"
                      value={settings.paymentGateway.razorpay.keyId}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentGateway: {
                          ...settings.paymentGateway,
                          razorpay: {
                            ...settings.paymentGateway.razorpay,
                            keyId: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="razorpay-key-secret">Razorpay Key Secret</Label>
                    <Input
                      id="razorpay-key-secret"
                      type="password"
                      value={settings.paymentGateway.razorpay.keySecret}
                      onChange={(e) => setSettings({
                        ...settings,
                        paymentGateway: {
                          ...settings.paymentGateway,
                          razorpay: {
                            ...settings.paymentGateway.razorpay,
                            keySecret: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Email Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Email Settings</h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input
                  id="smtp-host"
                  value={settings.emailSettings.smtpHost}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailSettings: {
                      ...settings.emailSettings,
                      smtpHost: e.target.value
                    }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input
                  id="smtp-port"
                  type="number"
                  value={settings.emailSettings.smtpPort}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailSettings: {
                      ...settings.emailSettings,
                      smtpPort: Number(e.target.value)
                    }
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-user">SMTP Username</Label>
                <Input
                  id="smtp-user"
                  value={settings.emailSettings.smtpUser}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailSettings: {
                      ...settings.emailSettings,
                      smtpUser: e.target.value
                    }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-pass">SMTP Password</Label>
                <Input
                  id="smtp-pass"
                  type="password"
                  value={settings.emailSettings.smtpPass}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailSettings: {
                      ...settings.emailSettings,
                      smtpPass: e.target.value
                    }
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from-email">From Email</Label>
                <Input
                  id="from-email"
                  type="email"
                  value={settings.emailSettings.fromEmail}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailSettings: {
                      ...settings.emailSettings,
                      fromEmail: e.target.value
                    }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-name">From Name</Label>
                <Input
                  id="from-name"
                  value={settings.emailSettings.fromName}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailSettings: {
                      ...settings.emailSettings,
                      fromName: e.target.value
                    }
                  })}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={settings.notificationSettings.emailNotifications}
                onCheckedChange={(checked: boolean) => setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    emailNotifications: checked
                  }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch
                id="sms-notifications"
                checked={settings.notificationSettings.smsNotifications}
                onCheckedChange={(checked: boolean) => setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    smsNotifications: checked
                  }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="application-updates">Application Updates</Label>
              <Switch
                id="application-updates"
                checked={settings.notificationSettings.applicationUpdates}
                onCheckedChange={(checked: boolean) => setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    applicationUpdates: checked
                  }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="payment-updates">Payment Updates</Label>
              <Switch
                id="payment-updates"
                checked={settings.notificationSettings.paymentUpdates}
                onCheckedChange={(checked: boolean) => setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    paymentUpdates: checked
                  }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="project-updates">Project Updates</Label>
              <Switch
                id="project-updates"
                checked={settings.notificationSettings.projectUpdates}
                onCheckedChange={(checked: boolean) => setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    projectUpdates: checked
                  }
                })}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
