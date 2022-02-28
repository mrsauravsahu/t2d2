terraform {
  required_providers {
    local = {
      source = "hashicorp/local"
      version = "2.1.0"
    }

    time = {
      source = "hashicorp/time"
      version = "0.7.2"
    }
  }
}

provider "local" { }
provider "time" { }