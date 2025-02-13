# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# import firebase_admin
# from firebase_admin import credentials
# import pyrebase
# import base64
# import json

# import os
# api_key = os.getenv("API_DATABASE")
# config = os.getenv("API_DATABASE_CONFIG")

# api_key_json = json.loads(base64.b64decode(api_key))

# cred = credentials.Certificate(api_key_json)
# firebase_admin.initialize_app(cred)

# firebase = pyrebase.initialize_app(config)
# auth_pyrebase = firebase.auth()

# @api_view(['Post'])
# def login_user(request):
#     try:
#         email = request.data.get("email")
#         password = request.data.get("password")

#         user = auth_pyrebase.sign_in_with_email_and_password(email, password)
#         return Response({
#             "status": "success",
#             "email": email,
#             "idToken": user["idToken"]
#         })
#     except Exception as e:
#         return Response({"status": "error", "message": str(e)}, status=400)