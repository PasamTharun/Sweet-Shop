# make_admin.py
from app.core.database import SessionLocal
from app.models.user import User

EMAIL = "pasam@test.com"  # change if your user email is different

def main():
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == EMAIL).first()
        if not user:
            print(f"User with email {EMAIL} not found")
            return
        user.is_admin = True
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"Updated user: {user.email}, is_admin={user.is_admin}")
    finally:
        db.close()

if __name__ == "__main__":
    main()
