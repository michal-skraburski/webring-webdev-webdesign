provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_pages_domain" "webring" {
  depends_on = [netcup-ccp_dns_record.webring]

  account_id   = var.cloudflare_account_id
  project_name = var.pages_project_name
  name         = local.domain_name
}

output "pages_domain_status" {
  description = "Cloudflare Pages custom-domain status (e.g. pending until DNS is visible)."
  value       = cloudflare_pages_domain.webring.status
}
