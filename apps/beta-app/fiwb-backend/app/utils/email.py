def standardize_email(email: str) -> str:
    """
    Standardize common email aliases to a primary version.
    This prevents duplicate user accounts when aliases are used.
    """
    if not email:
        return email
    
    email = email.lower().strip()
    
    # Map common aliases for the specific user
    if email == "sidwagh724@gmail.com":
        return "siddhantwagh724@gmail.com"
        
    return email

def get_sm_key_env_var(email: str) -> str:
    """Generate the expected environment variable name for a user's Supermemory key."""
    if not email:
        return ""
    sanitized = email.upper().replace("@", "_").replace(".", "_")
    return f"SUPERMEMORY_API_KEY_{sanitized}"
