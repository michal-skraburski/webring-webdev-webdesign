provider "netcup-ccp" {
  customer_number  = var.netcup_customer_number
  ccp_api_key      = var.netcup_ccp_api_key
  ccp_api_password = var.netcup_ccp_api_password
}

resource "netcup-ccp_dns_record" "webring" {
  domain_name = var.dns_domain
  name        = var.subdomain_name
  type        = "CNAME"
  value       = local.pages_cname_target
  priority    = "0"
}

output "netcup_cname_target" {
  description = "Value of the CNAME record in Netcup."
  value       = local.pages_cname_target
}
