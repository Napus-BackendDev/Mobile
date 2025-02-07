from rest_framework.decorators import api_view
from rest_framework.response import Response

import firebase_admin
from firebase_admin import credentials
import pyrebase
import json

import os
firebase_key = os.environ["KEY"]
Config = os.environ["CONFIG"]

cred = credentials.Certificate("firebase_key")
firebase_admin.initialize_app(cred)

firebase = pyrebase.initialize_app(Config)
auth_pyrebase = firebase.auth()

@api_view(['Post'])
def login_user(request):
    try:
        email = request.data.get("email")
        password = request.data.get("password")

        user = auth_pyrebase.sign_in_with_email_and_password(email, password)
        return Response({
            "status": "success",
            "email": email,
            "idToken": user["idToken"]
        })
    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=400)