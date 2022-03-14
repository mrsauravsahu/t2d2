terraform {
  required_providers {
    azure = {
      source  = "hashicorp/azurerm"
      version = "2.98.0"
    }
  }
}

provider "azure" {
  features {
  }
}
