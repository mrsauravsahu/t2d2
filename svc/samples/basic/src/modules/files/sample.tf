resource "local_file" "sample" {
  content = "0 1 1 2 3 5 8 13 21"
  filename = "${var.base_output_dir}/sample.txt"
}
