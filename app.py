from flask import Flask
from flask_cors import CORS
from routes.authRoutes import auth_bp
from routes.userRoutes import user_bp
import os
from config.config import Config

app = Flask(__name__)
CORS(app)

# Load Configuration
app.config.from_object(Config)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(user_bp, url_prefix="/api/user")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081)
