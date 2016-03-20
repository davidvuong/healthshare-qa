#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework_extensions.decorators import action

from project.applications.questions.models import Question, Answer
from project.applications.questions.serializers import QuestionSerializer
from project.applications.questions.serializers import AnswerSerializer


class QuestionViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        if self.action == 'list':
            queryset = Question.objects.all()
            queryset = queryset.annotate(score=Sum('answer__score'))
            queryset = queryset.order_by('-score')
            return queryset
        return self.queryset

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

    @action(methods=['POST'])
    def up(self, request, **kwargs):
        self.get_object().upvote(request.user)
        return Response(status=status.HTTP_200_OK)

    @action(methods=['POST'])
    def down(self, request, **kwargs):
        self.get_object().downvote(request.user)
        return Response(status=status.HTTP_200_OK)
