# GitHub Configuration with Terraform

This Terraform configuration manages GitHub repository branch protection rules and other settings.

## Prerequisites

- Terraform installed (v1.0.0 or newer)
- GitHub Personal Access Token with appropriate permissions
- Git installed

## Usage

1. Copy `terraform.tfvars.example` to `terraform.tfvars` and update the values:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. Set your GitHub token as an environment variable:
   ```bash
   # Linux/Mac
   export TF_VAR_github_token="your-token-here"
   
   # Windows PowerShell
   $env:TF_VAR_github_token="your-token-here"
   ```

3. Initialize Terraform:
   ```bash
   terraform init
   ```

4. Review the changes:
   ```bash
   terraform plan
   ```

5. Apply the changes:
   ```bash
   terraform apply
   ```

## Branch Protection Rules

This configuration sets up three protected branches:

1. `main` (Production)
   - Requires pull request reviews
   - Requires code owner reviews
   - Requires signed commits
   - Enforces linear history
   - Requires status checks (test and deploy-production)
   - Prevents force pushes and deletions

2. `staging` (Pre-production)
   - Requires pull request reviews
   - Requires status checks (test and deploy-staging)
   - Prevents force pushes and deletions

3. `develop` (Development)
   - Requires pull request reviews
   - Requires status checks (test)
   - Prevents force pushes and deletions

## Variables

| Name | Description | Required |
|------|-------------|----------|
| github_token | GitHub Personal Access Token | Yes |
| github_owner | GitHub Organization or User name | Yes |
| repository_name | Name of the GitHub repository | Yes | 