terraform {
  backend "s3" {
    bucket = "tf-state-575575708653"
    key    = "terraform.financyDrew.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  profile = "kerbyferris"
  region  = "us-east-1"
}

resource "aws_dynamodb_table" "table" {
  name           = "FinancyDrew_UserData"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "UserId"
  range_key      = "OrderDate"

  attribute {
    name = "UserId"
    type = "S"
  }

}
