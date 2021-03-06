#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.utils.translation import ugettext_lazy as _
from django.db import models

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

from project.applications.users.managers import UserManager
from project.applications.common.models import BaseModel


class User(BaseModel,
           AbstractBaseUser,
           PermissionsMixin):

    email = models.EmailField(
        verbose_name=_('email address'),
        max_length=255,
        unique=True,
    )

    first_name = models.CharField(max_length=32, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def _get_name(self):
        return self.first_name if self.first_name else self.email

    def get_full_name(self):
        return self._get_name()

    def get_short_name(self):
        return self._get_name()

    @property
    def is_staff(self):
        return self.is_admin
