CREATE TABLE IF NOT EXISTS users(
    id serial primary key,
    primary_type varchar(255) NOT NULL,
    primary_uid int,
    is_logged_in boolean,
    is_locked boolean,
    expires_on TIMESTAMP,
    jwt TEXT,
    username VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS auth_types(name varchar(255) NOT NULL PRIMARY KEY);

CREATE TABLE IF NOT EXISTS google_auth (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    google_user_id VARCHAR(255) NOT NULL,
    google_email VARCHAR(255) NOT NULL,
    google_display_name VARCHAR(255),
    google_access_token TEXT NOT NULL,
    google_refresh_token TEXT,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS email_password_auth(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    salt1 VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt2 VARCHAR(255) NOT NULL,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users_auth(
    user_id int,
    auth_type VARCHAR(255) NOT NULL,
    auth_id int
);


ALTER TABLE users_auth DROP CONSTRAINT IF EXISTS uq;
ALTER TABLE users_auth ADD CONSTRAINT uq UNIQUE (user_id, auth_type);




create or replace function createUser(pt varchar(255),puid int,ili boolean,il boolean,en TIMESTAMP,j TEXT, u VARCHAR(30)) returns void AS
$$
BEGIN
    IF EXISTS(SELECT name FROM auth_types where name = pt) THEN
        INSERT INTO users(primary_type,primary_uid,is_logged_in,is_locked,expires_on,jwt,username) VALUES (pt,puid,ili,il,en,j,u);
    ELSE
        RAISE EXCEPTION 'This is a custom error message.';
    END IF;
END;
$$ 
LANGUAGE plpgsql;

