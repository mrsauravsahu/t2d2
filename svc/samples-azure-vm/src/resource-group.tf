resource "azurerm_resource_group" "rg" {
  name     = "${var.prefix}-container"
  location = var.location
}
