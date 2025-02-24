export default function PrivacyPolicy() {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <section className="mb-8">
        <p className="mb-4"><strong>Last Updated: </strong>23-02-2025</p>
        <p className="mb-4">
          Thank you for installing and using Tabs Manager. This Privacy Policy explains how we collect, use, and protect your information in relation to the Extension. By installing or using the Extension, you agree to the terms outlined in this policy.
        </p>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-2">1.1 Tab Information</h3>
          <p className="mb-4">
            <strong>What We Collect:</strong> When you choose to save your open tabs, the Extension collects the URLs and titles of your currently open tabs.
          </p>
          <p className="mb-4">
            <strong>How We Collect:</strong> This information is collected only when you actively click "Save Tabs" (or equivalent) within the Extension. We do not passively track or monitor your browsing history without your explicit action.
          </p>
          
          <h3 className="text-xl font-semibold mb-2">1.2 User Preferences</h3>
          <p className="mb-4">
            <strong>What We Collect:</strong> The Extension may store user preferences (e.g., default save settings, UI preferences, etc.).
          </p>
          <p className="mb-4">
            <strong>How We Collect:</strong> These preferences are stored using the Chrome storage API or in local storage on your browser.
          </p>
          
          <h3 className="text-xl font-semibold mb-2">1.3 Server-Side Data</h3>
          <p className="mb-4">
            <strong>What We Collect:</strong> If you create an account or otherwise opt to save your data to our servers, we store your saved tab information (URL and tab title) and any necessary account details (e.g., username/email if required for login).
          </p>
          <p className="mb-4">
            <strong>How We Collect:</strong> This data is transmitted to our secure server via an encrypted (HTTPS) connection when you save your tabs.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Provide and Maintain the Extension:</strong> We use your tab information to enable the core functionality of saving and restoring tabs.</li>
            <li><strong>Improve User Experience:</strong> User preferences help us tailor features or settings to your needs (e.g., default behaviors when saving tabs).</li>
            <li><strong>Support and Troubleshooting:</strong> If you report an issue, we may request relevant information to diagnose and fix problems.</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Sharing and Disclosure</h2>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>No Selling of Data:</strong> We do not sell, trade, or rent your data to third parties.</li>
            <li><strong>Service Providers:</strong> In rare cases, we may use trusted third-party services (e.g., cloud hosting) to store data. These providers are contractually obligated to protect your data in accordance with this Privacy Policy.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to comply with legal processes (e.g., court orders).</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Local Storage:</strong> Your preferences are stored locally within the Extension's storage area in your browser.</li>
            <li><strong>Server Storage:</strong> Any tab data you choose to upload is stored in a secure database managed by Revenuelogy.</li>
            <li><strong>Security Measures:</strong> We use industry-standard security practices, such as HTTPS encryption in transit and database access controls, to protect your information. While we take reasonable steps to protect your data, no security measure is 100% foolproof.</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Choices and Controls</h2>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Opt-In Saving:</strong> The Extension only saves tab data when you explicitly choose to do so.</li>
            <li><strong>Local Storage Management:</strong> You can clear your browser's local data (including Extension storage) at any time via your browser's settings.</li>
            <li><strong>Data Deletion:</strong> If you have data stored on our servers, you may request deletion of your account or data by contacting us at tabs@revenuelogy.com. We will respond to your request within a reasonable timeframe.</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Remote Code and Permissions</h2>
          <h3 className="text-xl font-semibold mb-2">Permissions:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>activeTab / tabs / tabGroups:</strong> Used to read the URL and title of your current and/or grouped tabs for the sole purpose of saving them.</li>
            <li><strong>storage:</strong> Used to store user preferences locally.</li>
          </ul>
          <p className="mb-4">
            <strong>Remote Code:</strong> If any remote scripts are loaded (e.g., from our server) to enable up-to-date functionality, they are securely hosted and verified by us. No third-party scripts are loaded from unknown sources.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
          <p className="mb-4">
            Our Extension is not intended for use by children under the age of 13 (or the relevant age of digital consent in your country). We do not knowingly collect personal information from children. If you believe your child has provided personal information, please contact us at tabs@revenuelogy.com so we can delete it.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Extension after any modifications indicate your acceptance of the revised policy.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy or our data handling practices, please contact us at:
          </p>
          <p className="mb-4">
            Email: tabs@revenuelogy.com<br />
            Website: https://tabs.revenuelogy.com
          </p>
        </section>
  
        <p className="mt-8 text-sm text-gray-600">
          By installing or using Tabs Manager, you acknowledge that you have read, understood, and agree to this Privacy Policy.
        </p>
      </main>
    );
  }
  