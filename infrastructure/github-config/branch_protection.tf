# Main branch protection
resource "github_branch_protection" "main" {
  repository_id = var.repository_name
  pattern       = "main"

  required_status_checks {
    strict   = true
    contexts = ["test", "deploy-production"]
  }

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    require_code_owner_reviews      = true
    required_approving_review_count = 1
    require_last_push_approval      = true
  }

  enforce_admins                  = true
  require_signed_commits          = true
  require_conversation_resolution = true
  required_linear_history        = true
  allows_force_pushes            = false
  allows_deletions               = false
}

# Staging branch protection
resource "github_branch_protection" "staging" {
  repository_id = var.repository_name
  pattern       = "staging"

  required_status_checks {
    strict   = true
    contexts = ["test", "deploy-staging"]
  }

  required_pull_request_reviews {
    dismiss_stale_reviews           = true
    required_approving_review_count = 1
    require_last_push_approval      = true
  }

  enforce_admins                  = false
  require_conversation_resolution = true
  allows_force_pushes            = false
  allows_deletions               = false
}

# Develop branch protection
resource "github_branch_protection" "develop" {
  repository_id = var.repository_name
  pattern       = "develop"

  required_status_checks {
    strict   = true
    contexts = ["test"]
  }

  required_pull_request_reviews {
    required_approving_review_count = 1
  }

  enforce_admins                  = false
  require_conversation_resolution = true
  allows_force_pushes            = false
  allows_deletions               = false
} 