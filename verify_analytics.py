import requests
import sys

BASE_URL = "http://127.0.0.1:8000"

def verify():
    print("Testing Admin Analytics Endpoint...")
    
    try:
        # 1. Login to get token
        login_res = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"email": "admin@campusai.com", "password": "Admin@123"}
        )
        if login_res.status_code != 200:
            print(f"FAILED: Login failed: {login_res.json()}")
            return False
        
        token = login_res.json()["data"]["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        # 2. Test /department-stats
        res = requests.get(f"{BASE_URL}/api/admin/department-stats", headers=headers)
        print(f"Status: {res.status_code}")
        if res.status_code != 200:
            print(f"FAILED: /department-stats returned {res.status_code}")
            print(res.json())
            return False
        
        data = res.json()["data"]
        print(f"Response data: {data}")
        
        if not isinstance(data, list):
            print("FAILED: Data is not a list")
            return False
        
        if len(data) > 0:
            first = data[0]
            if "department" not in first or "students" not in first:
                print(f"FAILED: Data structure incorrect: {first}")
                return False
                
        # 3. Test /placement-stats (Legacy check)
        res_placement = requests.get(f"{BASE_URL}/api/admin/placement-stats", headers=headers)
        if res_placement.status_code != 200:
            print(f"FAILED: Legacy /placement-stats broken: {res_placement.status_code}")
            return False
        print("Legacy /placement-stats OK")

        print("SUCCESS: All analytics endpoints verified!")
        return True
    except Exception as e:
        print(f"FAILED: Connectivity error: {e}")
        return False

if __name__ == "__main__":
    if verify():
        sys.exit(0)
    else:
        sys.exit(1)
