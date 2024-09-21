# [@kaithia_bot](https://t.me/kaithia_bot)

[![Kaithia Bot](https://img.shields.io/badge/Telegram-Kaithia%20Bot-blue)](https://t.me/kaithia_bot)

## Overview
Kaithia is a Telegram bot that allows users to easily create group chats between themselves and a target person, with the option to include the bot itself in the group.

## Bot URL
[Click to open Kaithia Bot](https://t.me/kaithia_bot)

## Use Case
Kaithia simplifies group creation in Telegram by allowing users to quickly set up a chat with another person via simple commands. It can also manage the inclusion of the bot in the group if requested.

## Commands

- **/start**: Initialize or start Kaithia Bot.
- **/join**: Join a group or connect with other users.
- **/group [groupname]**: Create a group with another user.
- **/help**: Get more information about available commands.
- **/security**: Learn about data handling and security measures.

### Usage of the `/group` Command
- **/group MynewGroup**: Create a group named "MynewGroup" with another user.
- **/group [optional groupname] @kaithia**: Add the Kaithia bot to the group during creation by mentioning `@kaithia`.

## How to Use

1. Search for `@kaithia_bot` on Telegram and start the bot.
2. Enter or click on the `/join` command. You’ll receive a link to create your session.
3. Provide the phone number associated with your Telegram account, your Telegram password (if two-factor authentication is enabled), and the OTP that Telegram sends you.
4. Wait 2–3 minutes for your session to begin on the server.
5. Go to a private chat with any user and type `/group` to create a new group.

## Topics Covered

- Creates a group chat via `/group` in a direct message (DM) with another user.
- The other person will receive a link to join the newly created group, which will also include a link to the bot.
- The person will be added directly to the group if their settings permit.
- If no group name is provided, the default group name will be: "User's name <> Other person's name".
- If a group name is provided, that name will be used as the group's name.
- The group will be created with a link to the bot in the group description/about field.

- Users can add the bot to the group by mentioning `@kaithia` in the `/group` command.



# API Documentation for Kaithia Bot

This API provides endpoints to request and verify OTPs for Telegram authentication. It also updates the backend with the user's phone number during the OTP request.

## Endpoints

| **Endpoint**       | **Method** | **Parameter**      | **Type**   | **Required** | **Description**                                        | **Response Field**   | **Response Type** | **Response Description**                                         |
|--------------------|------------|--------------------|------------|--------------|--------------------------------------------------------|----------------------|------------------|-------------------------------------------------------------------|
| `/request_otp`     | POST       | `phone_number`     | `string`   | Yes          | The phone number to request the OTP for.                | `success`            | `boolean`        | Indicates if the OTP request was successful.                      |
|                    |            | `userId`           | `string`   | Yes          | The user ID associated with the telegram account.           | `message`            | `string`         | Success or error message.                                         |
|                    |            |                    |            |              |                                                        | `phone_code_hash`    | `string`         | The phone code hash for verifying the OTP.                        |
| `/verify_otp`      | POST       | `phone_number`     | `string`   | Yes          | The phone number to verify.                             | `success`            | `boolean`        | Indicates if the OTP verification was successful.                 |
|                    |            | `otp`              | `string`   | Yes          | The OTP code sent on the User's Telegram App.                  | `message`            | `string`         | Success or error message.                                         |
|                    |            | `phone_code_hash`  | `string`   | Yes          | The hash received during the OTP request.               | `auth_token`         | `string`         | The authentication token if verification is successful.           |
|                    |            | `password`         | `string`   | No           | Telegram password for two-factor authentication (if applicable). |                      |                   |                                                                   |

## Errors

For both endpoints, errors return the following structure:

| **Field** | **Type**   | **Description**                                              |
|-----------|------------|--------------------------------------------------------------|
| `error`   | `string`   | Error message if required parameters are missing or invalid.  |
| `message` | `string`   | Description of the error in case of server or parameter issues. |
| `success` | `boolean`  | Always `false` in case of an error.                          |
