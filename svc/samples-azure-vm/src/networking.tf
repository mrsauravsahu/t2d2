resource "azurerm_virtual_network" "vnet" {
  name     = "${var.prefix}-vnet"
  resource_group_name = azurerm_resource_group.rg.name
  location = var.location

  address_space = ["10.0.0.0/16"]
}

resource "azurerm_subnet" "subnet" {
  name = "${var.prefix}-subnet"
  resource_group_name = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name

  address_prefixes = ["10.0.1.0/24"]
}

resource "azurerm_network_interface" "main" {
  name                = "${var.prefix}-nic"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "test"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
  }
}