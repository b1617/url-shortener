## Task Description

We want you to build a URL shortener service. The application can be used to turn a long link into a shorter one (e.g.
https://www.stoik.com/barometre-ifop-2025-eti-risque-cyber → https://localhost/ABC123) that redirects to the original URL.

It looks simple, but it quickly raises real-world questions around reliability, security, data modeling, and scalability.

Your goal is to build a simple, clean, working version that we’ll review together during the interview.

## How to run the project

Docker and Docker Compose are required to run the project.

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone git@github.com:b1617/url-shortener.git
   cd url-shortener
   ```
2. Build and start the containers:
   ```bash
   docker compose up --build
   ```
3. Open a new terminal and set up the database:

   ```bash
   docker compose exec backend npx prisma migrate dev
   ```
4. Restart your container
     ```bash
   docker compose restart
   ```

Finally access the frontend application at `http://localhost:5173`

# Decision Record

### Problem statement

Build a URL shortener service that allows users to create shortened URLs that redirect to original URLs.

### Assumptions

- Write operations : 100 millions urls are generated per month, so approximately 1160 writes per seconds ( 100 millions / 24 hours / 3600 seconds)
- Read operations : 10:1 read to write ratio => 1160 x 10 = 11600 reads per second

- Assuming the url shortener app will run for 10 years, so we need at least 365 x 10 x 100 millions = 365 billions unique urls in the system

- The shortened URL should be as short as possible, ideally 7-10 characters long.

## Solutions for the algorithm to generate shortened URL identifiers

### 1: Using a Hashing Algorithm like MD5 or SHA-256

We take the original URL and apply a hashing algorithm to generate a fixed-length hash.
Then we can use a portion of this hash as the shortened URL identifier.

**Example : MD5("https://www.example.com") → "a9b9f04336ce0181a08e774e01113b31"**

we take only first 7 characters "a9b9f04" as the shortened URL identifier.

- Pros:
  - Easy to implement and understand.
  - Generates a unique identifier based on the original URL .
- Cons:
  - Hash collisions can occur, leading to potential data loss or overwriting. So we need to handle collisions, which adds complexity when we scale the system.

### 2: Using a Base62 Encoding of an Auto-Incrementing ID

We maintain a counter that increments with each new URL added to the system.
We convert this counter value to a Base62 representation to create a short and unique identifier.

**Example : ID 125 → Base62("cb")**

- Pros:
  - Guarantees uniqueness as long as the counter is managed correctly.
- Cons:
  - Predictable URLs which may not be desirable for all use cases.
  - Requires a centralized counter, which can be a bottleneck in distributed systems.
  - As the number of URLs grows, the length of the shortened URL will increase.

### Solution chosen :white_check_mark:

---

### Algorithm to generate shortened URL identifiers

We chose Solution 2: Using a Base62 Encoding of an Auto-Incrementing ID.

This approach guarantees uniqueness and is straightforward to implement.
Also we meet our requirement of 365 billions unique urls, we can generate short URLs of length 7 characters using Base62 encoding. **62^7 = 3.5 trillion unique combinations**.

We will use postgreSQL's SERIAL type to manage the auto-incrementing ID.

Given our assumptions about the number of URLs, we can efficiently generate short URLs that meet our requirements.

Also to reduce the predictability of the URLs, we can implement simple Xor obfuscation on the auto-incrementing ID before converting it to Base62.

**Secret key for Xor obfuscation : 0x123456789**

**Example : ID 125 ^ 0x123465789 = 591751156 → Base62("IrmZsENpAbXa")**

---

### Redirection mechanism

When a user accesses a shortened URL, the system needs to redirect them to the original URL.

We implemented a simple lookup mechanism where the shortened URL is used to query the database to retrieve the entry.

If found, the system responds with an HTTP 301 redirect to the original URL.
we prefer using 301 redirect than 302 redirect as the browser will cache this redirect for future requests, improving performance for frequently accessed URLs.

---

## Improvements can be made in the following areas:

- Better error handling to explicitly response on the frontend
- Implement rate limiting to prevent abuse
- No found page : redirect to a custom no found page instead of homepage
- Add redis caching layer to improve read performance
- Add backend tests 

## Technologies Used

- **Backend**: Fastify
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Frontend**: React
- **UI Library**: Tailwind CSS with Shadcn UI components
- **State Management**: Redux Toolkit Query
- **Validation and Typing**: Zod
- **DX**: Docker and Docker Compose

- **AI Assistance**: Copilot and chatGPT
