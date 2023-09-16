from bs4 import BeautifulSoup
import requests

# Fetch the webpage content
all_companies_url = 'https://esg.exerica.com/Companies'
url = 'https://esg.exerica.com/Company?Name='

def read(file):
    try:
        with open(file, 'r') as f:
            lines = f.readlines() 
        return [line.strip() for line in lines]  
    except FileNotFoundError:
        print(f"File '{file}' not found.")
        return []

def get_q4_2020_txt(table_html, th_content):
    soup = BeautifulSoup(table_html, 'html.parser')
    
    # Find the first <th> element with the specified content
    target_th = soup.find('th', text=th_content)
    if not target_th:
        target_th = soup.find('th', text='2020Q3')
    
    # If the target <th> is found, find the first <td> after it
    if target_th:
        next_td = target_th.find_next('td')
        
        if next_td:
            return next_td.get_text(strip=True)  
    return None  # Return None if the target elements were not found


def get_company_name_from_symbol(table_html):
    
    soup = BeautifulSoup(table_html, 'html.parser')

    tickers = soup.find_all('div', class_='ticker')
    print('here')
    for ticker in tickers:
        #print(ticker.get_text(strip=True))
        if ticker and ticker.get_text(strip=True) in companies:
            name = ticker.find_next('div', class_='company-name')
            print(name.get_text())

companies = read('tickers.txt')
names = read('companies.txt')

for name in names:
    response = requests.get(url + name) 

    html_content = response.text
    amount = get_q4_2020_txt(html_content, '2020Q4')

    if not amount:
        print(f'No amount found for {name}')
    else:
        amount = float(amount.replace(',', ''))
        print(f'{name}: {amount*1000} tonnes of CO2e')
    

