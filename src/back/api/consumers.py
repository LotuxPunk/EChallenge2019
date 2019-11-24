from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "test"
        self.room_group_name = 'chat_test'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        user = text_data_json["username"]

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'chat_message',
                'message':message,
                'username': user
            }
        )

    async def chat_message(self, event):
        message = event['message']
        user = event['username']

        await self.send(text_data=json.dumps({
            'message':message,
            'username': user
        }))

class ActivityConsummer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = "rpg"
        self.room_group_name = "chat_rpg"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        type_notif = text_data_json["type_notif"]
        user = text_data_json["username"]

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'notify_done',
                'type_notif':type_notif,
                'username': user
            }
        )

    async def notify_done(self, event):
        type_notif = event['type_notif']
        username = event['username']

        await self.send(text_data=json.dumps({
            'type_notif':type_notif,
            'username': username
        }))

    
        
        


    



