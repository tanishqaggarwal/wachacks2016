import webapp2
import jinja2
import os
import re
from google.appengine.ext import ndb

JINJA_ENVIRONMENT = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)), 
                                       extensions=['jinja2.ext.autoescape'],
                                       autoescape=True)

class Index(webapp2.RequestHandler):
  def get(self):
    self.response.out.write(JINJA_ENVIRONMENT.get_template("index_old.html").render())

# class Register(webapp2.RequestHandler):
#   def get(self):
#     self.response.out.write(JINJA_ENVIRONMENT.get_template("register.html").render())

# class Team(webapp2.RequestHandler):
#   def get(self):
#     self.response.out.write(JINJA_ENVIRONMENT.get_template("team.html").render())

def valid_email(emailstr):
  return re.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$', emailstr) != None

class Subscribe(webapp2.RequestHandler):
  def post(self):
    email = self.request.get("email")
    if valid_email(email) and not Subscription.query(Subscription.email == email).get():
      subscription = Subscription()
      subscription.email = email
      subscription.ip    = self.request.remote_addr
      subscription.put()
      self.response.out.write("done")

class Subscription(ndb.Model):
  date_inserted = ndb.DateTimeProperty(auto_now_add = True)
  email         = ndb.StringProperty(required = True)
  ip            = ndb.StringProperty(required = True)

app = webapp2.WSGIApplication([
  ('/', Index),
  # ('/team', Team),
  # ('/register', Register),
  ('/subscribe', Subscribe)], debug = True)