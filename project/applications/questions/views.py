#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import mixins, viewsets

from project.applications.questions.models import Question, Answer
from project.applications.questions.serializers import QuestionSerializer
from project.applications.questions.serializers import AnswerSerializer


class QuestionViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    queryset = Answer.objects.none()
    serializer_class = AnswerSerializer
