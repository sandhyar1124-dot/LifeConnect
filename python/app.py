from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__, template_folder='../template', static_folder='../style')
app.secret_key = 'lifeconnect_secret_key'

# SQLite Database Setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lifeconnect.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    role = db.Column(db.String(20), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def openpage():
    return render_template('openpage.html')

# --- INDHA ORU SIGNIN ROUTE MATTUM THAAN IRUKKANUM ---
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        in_name = request.form.get('username', '').strip()
        in_email = request.form.get('email', '').strip()
        in_pass = request.form.get('password', '').strip()
        
        user = User.query.filter_by(email=in_email).first()

        if user:
            # Name, Email, matrum Password moonaiyum check panrom
            if user.username.strip() == in_name and user.password.strip() == in_pass:
                if user.role == 'donor':
                    return redirect(url_for('dashboard'))
                else:
                    return redirect(url_for('request_blood'))
            else:
                return "Error: Name or Password does not match! <a href='/signin'>Try again</a>", 401
        else:
            return "User not found! <a href='/signup'>Signup here</a>", 404
            
    return render_template('signin.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role', 'donor')

        if User.query.filter_by(email=email).first():
            return "Email already exists!"

        new_user = User(username=username, email=email, password=password, role=role)
        try:
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('signin'))
        except:
            db.session.rollback()
            return "Error saving data."
    
    return render_template('signup.html')

# Matra ella routes
@app.route('/dashboard')
def dashboard(): return render_template('dashboard1.html')

@app.route('/request')
def request_blood(): return render_template('request.html')

@app.route('/my_requests')
def my_requests(): return render_template('my-request.html')

@app.route('/history')
def history(): return render_template('history.html')

@app.route('/achievements')
def achievements(): return render_template('achievements.html')

@app.route('/about')
def about(): return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)