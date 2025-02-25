FROM mcr.microsoft.com/playwright:v1.40.0  # Базовий імейдж Playwright
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx playwright install --with-deps
CMD ["npx", "playwright", "test"]