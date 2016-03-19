#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.db import models
from project.applications.common.models import BaseModel


class Question(BaseModel):
    title = models.CharField(max_length=128)
    description = models.TextField()

    user = models.ForeignKey('users.User')

    def get_answer_count(self):
        return self.answer_set.count()

    def get_score(self):
        return 0  # TODO: Calculate score based on up/down votes.


class Answer(BaseModel):
    description = models.TextField()
    user = models.ForeignKey('users.User')
    question = models.ForeignKey('questions.Question')

    def upvote(self, user):
        pass

    def downvote(self, user):
        pass
