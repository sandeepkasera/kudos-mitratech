from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view),
    path("me/", views.me_view),
    path("users/", views.users_list),
    path("kudos/give/", views.give_kudo),
    path("kudos/received/", views.received_kudos),
]
