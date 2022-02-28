module "files" { 
  source = "./modules/files" 
  base_output_dir = "${path.module}/outputs"
}

resource "time_sleep" "wait_some_time" {
  create_duration = var.wait_time
}
