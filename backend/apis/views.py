from django.shortcuts import render
from rest_framework import viewsets,routers,serializers
from .models import *
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializer import InventorySerializer,MovementSerializer


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventorySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if InventoryItem.objects.get(name=request.data['name']):
            return Response("Item already exists")
        if request.data['in_house'] > request.data['quantity']:
            return Response("In house cannot be greater than quantity")
        return super().create(request, *args, **kwargs)


class MovementViewSet(viewsets.ModelViewSet):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        instance = self.get_object()
        item = InventoryItem.objects.get(id=instance.item.id)
        if item.in_house <= 0:
            return Response("Not enough items in house")
        item.in_house -= int(instance.quantity)
        item.save()
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        item = InventoryItem.objects.get(id=instance.item.id)
        item.in_house += int(instance.quantity)
        item.save()
        return super().destroy(request, *args, **kwargs)

    # def partial_update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     item = InventoryItem.objects.get(id=instance.item.id)
    #     item.in_house += int(instance.quantity)
    #     item.save()
    #     return super().update(request, *args, **kwargs)

    

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
# def movement_list(request):
#     movements = Movement.objects.all()
#     serializer = MovementSerializer(movements, many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
# def movement_borrow(request):
#     item = InventoryItem.objects.get(id=request.data['item'])
#     item.in_house -= request.data['quantity']
#     item.save()
#     serializer = MovementSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def movement_return(request):
    item = InventoryItem.objects.get(id=request.data['item'])
    item.in_house += int(request.data['quantity'])
    item.save()
    movement = Movement.objects.get(id=request.data['id'])
    movement.returned = True
    movement.save()
    return Response("Success")


# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
# def movement_delete(request):
#     item = InventoryItem.objects.get(id=request.data['item'])
#     item.in_house += request.data['quantity']
#     item.save()
#     movement = Movement.objects.get(id=request.data['id'])
#     movement.delete()
#     return Response("Success")



