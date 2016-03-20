#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.db import models
from project.applications.common.models import BaseModel


class Vote(BaseModel):
    UPVOTE = 'upvote'
    DOWNVOTE = 'downvote'

    TYPE_CHOICES = (
        (UPVOTE, 'upvote'),
        (DOWNVOTE, 'downvote'),
    )

    user = models.ForeignKey('users.User')
    answer = models.ForeignKey('questions.Answer')
    type = models.CharField(max_length=16, choices=TYPE_CHOICES)

    # `-1` if `type == DOWNVOTE` else `1` (used for easier score calculations).
    value = models.PositiveSmallIntegerField()
