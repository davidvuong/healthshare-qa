#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin

from rest_framework_extensions.routers import (
    ExtendedSimpleRouter as SimpleRouter
)

from project.applications.users.views import UserViewSet
from project.applications.authentication.views import AuthenticationViewSet
from project.applications.questions.views import QuestionViewSet, AnswerViewSet

api_router = SimpleRouter()
api_router.register(r'users', UserViewSet)
api_router.register(r'auth', AuthenticationViewSet)

qa_router = api_router.register(r'questions', QuestionViewSet)
qa_router.register(r'answers',
                   AnswerViewSet,
                   'question-answers',
                   parents_query_lookups=['id'])

urlpatterns = [
    url(r'^api/', include(api_router.urls)),
    url(r'^admin/', admin.site.urls),
]
