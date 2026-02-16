# Beta User Management Guide

## Overview

The FIWB AI beta application now has email-based access control. Only users whose emails are in the whitelist can access the beta application at `https://beta.fiwbai.xyz`.

---

## How It Works

1. **User clicks "Beta" button** on the landing page (`https://fiwbai.xyz`)
2. **User is redirected** to `https://beta.fiwbai.xyz`
3. **User attempts to login** with Google OAuth
4. **Backend checks** if user's email is in the `BETA_USERS` whitelist
5. **Access granted or denied**:
   - ✅ **Whitelisted**: User can access the full application
   - ❌ **Not whitelisted**: User sees error message directing them to join waitlist

---

## Adding Beta Users

### Method 1: Edit the Configuration File (Recommended)

1. Open the beta configuration file:
   ```bash
   nano /Users/owaissayyed/Github\ Repos/FIWB\ Duplicate/fiwb-local/fiwb-backend/app/beta_config.py
   ```

2. Add email addresses to the `BETA_USERS` list:
   ```python
   BETA_USERS = [
       "john.doe@example.com",
       "jane.smith@university.edu",
       "beta.tester@company.com",
   ]
   ```

3. Save the file and restart the backend server

### Method 2: Environment Variable (For Production)

For production deployments (Railway/Render), you can also use environment variables:

1. Set an environment variable `BETA_USERS_LIST`:
   ```
   BETA_USERS_LIST=user1@example.com,user2@example.com,user3@example.com
   ```

2. Update `beta_config.py` to read from environment:
   ```python
   import os
   
   # Read from environment variable if available
   env_beta_users = os.getenv('BETA_USERS_LIST', '')
   BETA_USERS = [email.strip() for email in env_beta_users.split(',') if email.strip()]
   
   # Or use hardcoded list
   if not BETA_USERS:
       BETA_USERS = [
           # Add emails here
       ]
   ```

---

## Disabling Beta Restrictions

When you're ready to launch publicly, you have two options:

### Option 1: Disable the Check
In `beta_config.py`, set:
```python
BETA_ACCESS_ENABLED = False
```

### Option 2: Remove the Code
Comment out or remove the beta access check in `app/api/auth.py` (lines 99-105)

---

## Testing Beta Access

### Test with Whitelisted Email:
1. Add your test email to `BETA_USERS`
2. Restart backend: `kill <PID> && cd fiwb-backend && source venv/bin/activate && uvicorn app.main:app --reload --port 8001`
3. Try logging in - should succeed

### Test with Non-Whitelisted Email:
1. Use an email NOT in `BETA_USERS`
2. Try logging in - should see error:
   ```
   Beta access not granted. Please join our waitlist at https://fiwbai.xyz for early access.
   ```

---

## Error Messages Users Will See

### Non-Whitelisted User:
```
403 Forbidden
Beta access not granted. Please join our waitlist at https://fiwbai.xyz for early access.
```

### Whitelisted User:
- Normal login flow
- Full access to the application

---

## Monitoring Beta Users

### Check Current Beta Users:
```bash
cat /Users/owaissayyed/Github\ Repos/FIWB\ Duplicate/fiwb-local/fiwb-backend/app/beta_config.py
```

### Check Who's Logged In (Database Query):
```bash
cd /Users/owaissayyed/Github\ Repos/FIWB\ Duplicate/fiwb-local/fiwb-backend
source venv/bin/activate
python3 -c "
from app.database import SessionLocal
from app.models import User

db = SessionLocal()
users = db.query(User).all()
print('Current Beta Users:')
for user in users:
    print(f'  - {user.email}')
db.close()
"
```

---

## Best Practices

1. **Keep the list updated**: Regularly review and update the beta user list
2. **Use institutional emails**: Prefer `.edu` or company emails for beta testers
3. **Document feedback**: Keep track of which beta users provided valuable feedback
4. **Gradual rollout**: Start with 5-10 users, then expand to 20-50
5. **Monitor usage**: Check backend logs to see beta user activity

---

## Deployment Checklist

### Before Deploying to Production:

- [ ] Add initial beta users to `BETA_USERS` list
- [ ] Set `BETA_ACCESS_ENABLED = True`
- [ ] Test with both whitelisted and non-whitelisted emails
- [ ] Update landing page waitlist form to collect emails
- [ ] Set up process for reviewing waitlist and adding users to beta
- [ ] Configure error monitoring (Sentry) to track 403 errors
- [ ] Document the process for your team

### When Ready for Public Launch:

- [ ] Set `BETA_ACCESS_ENABLED = False`
- [ ] Or remove beta access code entirely
- [ ] Update landing page to remove "Beta" button or change messaging
- [ ] Announce public launch to waitlist users
- [ ] Monitor server capacity

---

## Quick Commands

### Restart Backend After Adding Users:
```bash
cd /Users/owaissayyed/Github\ Repos/FIWB\ Duplicate/fiwb-local
./run_locally.sh
```

### View Backend Logs:
```bash
tail -f /Users/owaissayyed/Github\ Repos/FIWB\ Duplicate/fiwb-local/fiwb-backend/backend.log
```

### Check for 403 Errors (Access Denied):
```bash
grep "403" /Users/owaissayyed/Github\ Repos/FIWB\ Duplicate/fiwb-local/fiwb-backend/backend.log
```

---

## Support

If a beta user reports access issues:

1. **Verify their email** is in `BETA_USERS` list (check for typos)
2. **Check they're using the correct Google account** (some users have multiple)
3. **Verify backend is running** and `BETA_ACCESS_ENABLED = True`
4. **Check backend logs** for specific error messages
5. **Try adding their email** and restarting the backend

---

## Example Beta User List

```python
BETA_USERS = [
    # Team members
    "owais@fiwbai.xyz",
    "team@fiwbai.xyz",
    
    # Early adopters
    "student1@iitbombay.ac.in",
    "professor@university.edu",
    
    # Beta testers
    "tester1@gmail.com",
    "tester2@outlook.com",
]
```
