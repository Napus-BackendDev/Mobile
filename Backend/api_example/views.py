from rest_framework.decorators import api_view
from rest_framework.response import Response

import firebase_admin
from firebase_admin import credentials
import pyrebase
import json

cred = credentials.Certificate("Data_key/key.json")
firebase_admin.initialize_app(cred)

config = {
    "apiKey": "AIzaSyCbdk_ec2h2w5j0mAXaJHijdvISdzUKUlk",
    "authDomain": "mobile-app-1840d.firebaseapp.com",
    "databaseURL": "https://mobile-app-1840d-default-rtdb.firebaseio.com",
    "projectId": "mobile-app-1840d",
    "storageBucket": "mobile-app-1840d.firebasestorage.app",
    "messagingSenderId": "585901648555",
    "appId": "1:585901648555:web:942de87bc720469cd5e5ee",
    "measurementId": "G-LPJDZ3RZLK"

}

firebase = pyrebase.initialize_app(config)
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