#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import serializers
from project.applications.questions.models import Question, Answer
from project.applications.users.serializers import UserSerializer


class QuestionSerializer(serializers.ModelSerializer):
    answer_count = serializers.ReadOnlyField(source='get_answer_count')
    score = serializers.ReadOnlyField(source='get_score')
    user = UserSerializer()

    class Meta(object):
        model = Question
        fields = (
            'id',
            'user',
            'title',
            'description',
            'created_at',
            'updated_at',
            'answer_count',
            'score',
        )
        read_only_fields = ('id', 'created_at', 'updated_at',)


class AnswerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta(object):
        model = Answer
        fields = ('id', 'user', 'description', 'question', 'created_at', 'updated_at',)
        read_only_fields = ('id', 'created_at', 'updated_at',)
