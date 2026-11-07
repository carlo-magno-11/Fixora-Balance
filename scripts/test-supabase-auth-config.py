from pathlib import Path
import re
import tomllib

CONFIG_PATH = Path("supabase/config.toml")


def duration_seconds(value: str) -> int:
    match = re.fullmatch(r"(\d+)(s|m|h|d)", value)
    if not match:
        raise AssertionError(f"Unsupported duration format: {value!r}")
    amount = int(match.group(1))
    multiplier = {"s": 1, "m": 60, "h": 3600, "d": 86400}[match.group(2)]
    return amount * multiplier


config = tomllib.loads(CONFIG_PATH.read_text(encoding="utf-8"))
auth = config["auth"]
email = auth["email"]

assert auth["enabled"] is True, "Local Supabase Auth must be enabled"
assert auth["enable_signup"] is True, "Email signup must remain available for local development"
assert auth["enable_anonymous_sign_ins"] is False, "Anonymous sign-ins must remain disabled"
assert auth["enable_refresh_token_rotation"] is True, "Refresh-token rotation must be enabled"
assert auth["jwt_expiry"] <= 3600, "Access tokens must not exceed one hour"
assert auth["minimum_password_length"] >= 15, "Password minimum must be at least 15 characters before MFA is deployed"
assert auth["password_requirements"] == "", "Do not impose composition rules; support passphrases and all characters"
assert "fixorabal://auth/callback" in auth["additional_redirect_urls"], "The exact mobile auth callback must be allow-listed"

assert email["enabled"] is True, "Email authentication must be enabled"
assert email["enable_confirmations"] is True, "Email confirmation must be required"
assert email["double_confirm_changes"] is True, "Email changes must require confirmation of both addresses"
assert email["secure_password_change"] is True, "Password changes must require recent/current authentication"
assert duration_seconds(email["max_frequency"]) >= 60, "Email resend interval must be at least one minute"
assert 6 <= email["otp_length"] <= 10, "Email OTP length must be within Supabase-supported bounds"
assert email["otp_expiry"] <= 3600, "Email OTP lifetime must not exceed one hour"

print("Local Supabase Auth security configuration checks passed.")
