# All input variables for this module (Netcup + Cloudflare Pages).

# --- Netcup (DNS at Netcup CCP) ---

variable "netcup_customer_number" {
  description = "Netcup customer number (same as CCP login)."
  type        = string
}

variable "netcup_ccp_api_key" {
  description = "Netcup CCP API key (CCP → Stammdaten → API)."
  type        = string
  sensitive   = true
}

variable "netcup_ccp_api_password" {
  description = "Netcup CCP API password."
  type        = string
  sensitive   = true
}

variable "dns_domain" {
  description = "Apex domain whose DNS zone Netcup hosts (e.g. webdev-webdesign.com)."
  type        = string
  default     = "webdev-webdesign.com"
}

variable "subdomain_name" {
  description = "Hostname label managed in Netcup (webring → webring.webdev-webdesign.com)."
  type        = string
  default     = "webring"
}

# --- Cloudflare Pages (hostname on the project) ---

variable "cloudflare_api_token" {
  description = "API token with Account → Cloudflare Pages → Edit (and Pages Read). Not used for Netcup DNS."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID (Workers & Pages overview, or URL in dashboard)."
  type        = string
}

variable "pages_project_name" {
  description = "Pages project name as shown in the Cloudflare dashboard (slug)."
  type        = string
}

variable "pages_cname_target" {
  description = "CNAME target in Netcup. Leave empty to use \"<pages_project_name>.pages.dev\"."
  type        = string
  default     = ""
}