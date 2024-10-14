# tests/test_tasks.py
import requests

def test_create_task():
    r = requests.post('http://localhost:8000/v1/tasks', json={"title": "My First Task"})
    assert isinstance(r.json()["id"], int)
    assert len(r.json()) == 1

def test_list_all_tasks():
    r = requests.get('http://localhost:8000/v1/tasks')
    assert isinstance(r.json(), list)
    assert isinstance(r.json()[0]["id"], int)
    assert isinstance(r.json()[0]["title"], str)
    assert isinstance(r.json()[0]["is_completed"], bool)

def test_get_task():
    r = requests.get('http://localhost:8000/v1/tasks/1')
    assert isinstance(r.json(), dict)
    assert isinstance(r.json()["id"], int)
    assert isinstance(r.json()["title"], str)
    assert isinstance(r.json()["is_completed"], bool)

def test_update_task():
    r = requests.put('http://localhost:8000/v1/tasks/1', json={"title": "Updated Task", "is_completed": True})
    assert r.status_code == 204

def test_delete_task():
    r = requests.delete('http://localhost:8000/v1/tasks/1')
    assert r.status_code == 204
