resource "local_file" "sample" {
  content = "1 1 2 3 5 8 13 21"
  filename = "output.txt"
}
