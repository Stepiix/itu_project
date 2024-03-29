DROP TABLE IF EXISTS AGroup CASCADE;
DROP TABLE IF EXISTS Chat CASCADE;
DROP TABLE IF EXISTS GroupUser CASCADE;
DROP TABLE IF EXISTS User CASCADE;
DROP TABLE IF EXISTS Transaction CASCADE;


CREATE TABLE User (
    user_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_firstname VARCHAR(32) NOT NULL,
    user_lastname VARCHAR(32) NOT NULL,
    user_email VARCHAR(32) NOT NULL,
    user_password VARCHAR(128) NOT NULL,
    user_photo MEDIUMBLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE AGroup (
    group_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    group_name VARCHAR(32) NOT NULL,
    group_label VARCHAR(64),
    group_link VARCHAR(128),
    group_photo MEDIUMBLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE GroupUser (
    group_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (group_id, user_id),

    CONSTRAINT FK_group_id
        FOREIGN KEY (group_id) REFERENCES AGroup(group_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT FK_user_id
        FOREIGN KEY (user_id) REFERENCES User(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Transaction (
    t_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    t_group_id INTEGER NOT NULL,
    t_user_payer_id INTEGER NOT NULL,
    t_user_debtor_id INTEGER NOT NULL,
    t_amount INTEGER NOT NULL,
    t_currency VARCHAR(10) NOT NULL,
    t_exchange_rate INTEGER NOT NULL,
    t_label VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT FK_t_group_id
        FOREIGN KEY (t_group_id) REFERENCES AGroup(group_id)
        ON UPDATE CASCADE,

    CONSTRAINT FK_t_user_payer_id
        FOREIGN KEY (t_user_payer_id) REFERENCES User(user_id)
        ON UPDATE CASCADE,


    CONSTRAINT FK_t_user_debtor_id
        FOREIGN KEY (t_user_debtor_id) REFERENCES User(user_id)
        ON UPDATE CASCADE

);

CREATE TABLE Chat (
    message_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    message_group_id INTEGER NOT NULL,
    message_user_id INTEGER NOT NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    CONSTRAINT FK_message_group_id
        FOREIGN KEY (message_group_id) REFERENCES AGroup(group_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT FK_message_user_id
        FOREIGN KEY (message_user_id) REFERENCES User(user_id)
        ON UPDATE CASCADE

);
