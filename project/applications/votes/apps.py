#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.apps import AppConfig


class VotesConfig(AppConfig):
    name = 'project.applications.votes'

    def ready(self):
        from applications.votes import signals
