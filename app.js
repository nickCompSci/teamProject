require('dotenv').config();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// make instance of an express app
const app = express();

