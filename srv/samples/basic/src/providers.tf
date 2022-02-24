terraform {
  required_providers {
    time = {
      version = "0.7.2"
    }
    local = {
      version = "2.1.0"
    }
  }
}

provider "time" { }
provider "local" { }
