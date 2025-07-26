from flask import Flask, render_template, redirect, url_for, request
import json

app = Flask(__name__,static_folder="static")

with open("static/data/jsons/projects.json") as f1:
    all_projects = json.load(f1)

with open("static/data/jsons/skills.json") as f2:
    skills_list = json.load(f2)

with open("static/data/jsons/about.json") as f3:
    about_data = json.load(f3)


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html",data=about_data)

@app.route("/projects")
def projects():
    category = request.args.get('category', 'All')

    if category == 'All':
        filtered_projects = all_projects
    else:
        filtered_projects = [proj for proj in all_projects if proj['category'] == category]

    categories = list({proj['category'] for proj in all_projects})
    categories.insert(0, 'All')

    return render_template("projects.html", projects=filtered_projects, categories=categories, selected=category)


@app.route("/skills")
def skills():
    return render_template("skills.html",data=skills_list)

@app.route("/contact")
def contact():
    return render_template("contact.html")

if __name__=="__main__":
    app.run(host="0.0.0.0",debug=True)