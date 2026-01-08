import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo"

@csrf_exempt
def google_login(request):
    if request.method == "POST":
        body = json.loads(request.body)
        token = body.get("token")

        # Verify token with Google
        response = requests.get(
            GOOGLE_TOKEN_INFO_URL,
            params={"id_token": token}
        )

        if response.status_code != 200:
            return JsonResponse({"error": "Invalid token"}, status=400)

        user_info = response.json()

        return JsonResponse({
            "message": "Login successful",
            "email": user_info["email"],
            "name": user_info["name"]
        })
