from rest_framework import serializers
from .models import InventoryItem,Movement

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = ('id', 'name', 'description', 'quantity', 'in_house','created_at')


class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movement
        fields = ('id', 'item', 'quantity','returned', 'date')