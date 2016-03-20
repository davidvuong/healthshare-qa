#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404
from rest_framework import mixins, viewsets

from project.applications.questions.models import Question, Answer
from project.applications.questions.serializers import QuestionSerializer
from project.applications.questions.serializers import AnswerSerializer


class QuestionViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AnswerViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def get_queryset(self):
        question = get_object_or_404(Question, id=self.kwargs['parent_lookup_id'])
        return Answer.objects.filter(question=question).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
