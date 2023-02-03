from django.urls import path,include
from .views import *

inventory_router = routers.DefaultRouter()
inventory_router.register("inventory",viewset=InventoryViewSet)

movement_router = routers.DefaultRouter()
movement_router.register("movements",viewset=MovementViewSet)


urlpatterns =inventory_router.urls+ movement_router.urls+[
    path('return/',movement_return,name='movement_return'),
    ]
    # path('movements/',movement_list,name='movement_list'),
    # path('borrow/',movement_borrow,name='movement_borrow'),

    # path('delete/',movement_delete,name='movement_delete'),