# -----------------------------------------------------------------------------
# Netcup DNS + Cloudflare Pages
#
# Netcup: CNAME webring → Pages host. Cloudflare: register custom domain on Pages.
# See netcup.tf and cloudflare.tf. Variables: variables.tf
# -----------------------------------------------------------------------------

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
    netcup-ccp = {
      source  = "rincedd/netcup-ccp"
      version = "~> 0.0.1"
    }
  }
}

locals {
  domain_name = "${var.subdomain_name}.${var.dns_domain}"
  pages_cname_target = var.pages_cname_target != "" ? var.pages_cname_target : "${var.pages_project_name}.pages.dev"
}

output "webring_domain_name" {
  description = "Hostname: Netcup CNAME + Pages custom domain."
  value       = local.domain_name
}
