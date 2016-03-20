#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.db import models, transaction
from django.db.models import Sum
from project.applications.common.models import BaseModel
from project.applications.votes.models import Vote


class Question(BaseModel):
    title = models.CharField(max_length=128)
    description = models.TextField()

    user = models.ForeignKey('users.User')

    def get_answer_count(self):
        return self.answer_set.count()

    def get_score(self):
        score = Question.objects.filter(id=self.id)
        score = score.aggregate(Sum('answer__score'))
        return score['answer__score__sum']


class Answer(BaseModel):
    description = models.TextField()
    user = models.ForeignKey('users.User')
    question = models.ForeignKey('questions.Question')
    score = models.IntegerField(default=0)

    def _vote(self, user, defaults):
        """Never create a new vote, just update an existing one if exists."""
        with transaction.atomic():
            vote, created = Vote.objects.get_or_create(
                user=user, answer=self, defaults=defaults
            )
            if created:
                self.score += vote.value
                self.save()

    def upvote(self, user):
        self._vote(user, {'type': Vote.UPVOTE})

    def downvote(self, user):
        self._vote(user, {'type': Vote.DOWNVOTE})
